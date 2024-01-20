import { ref } from 'vue';

export function useCrypto() {
  const { crypto: { subtle: KeyLoader } } = window;
  // const aesKey = ref();
  // const aesIV = ref();

  async function encrypt(data, key, iv) {
    const encoder = new TextEncoder();
    const AES = await KeyLoader.importKey(
      "raw",
      key,
      "AES-CBC",
      false,
      ["encrypt"],
    );

    const encrypted = await KeyLoader.encrypt(
      {
        name: "AES-CBC",
        iv,
      },
      AES,
      encoder.encode(data),
    );

    return btoa(
      encodeURIComponent(
        String.fromCharCode(...(new Uint8Array(encrypted)))
      )
    );
  }

  async function decrypt(data, key, iv) {
    try {
      const decoder = new TextDecoder();
      const AES = await KeyLoader.importKey(
        "raw",
        key,
        "AES-CBC",
        false,
        ["decrypt"],
      );

      const binary = decodeURIComponent(atob(data));
      const decoded = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        decoded[i] = binary.charCodeAt(i);
      }

      // console.log([binary.length, decoded.buffer]);

      const decrypted = await KeyLoader.decrypt(
        {
          name: "AES-CBC",
          iv,
        },
        AES,
        decoded,
      );

      return decoder.decode(decrypted);
    } catch (e) {
      console.log(e);
    }
  }

  return { encrypt, decrypt };
}
