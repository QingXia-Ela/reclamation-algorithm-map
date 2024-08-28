
const textDecoder = new TextDecoder("utf-8");

/**
 * Asynchronously fetches a resource from the local server.
 * 
 * This methods only support get and utf-8.
 * 
 * @param {string} url - The URL of the resource to fetch.
 * @returns {Promise<Response>} - A promise that resolves with the fetched resource.
 * @throws {Error} - If the resource fails to be fetched.
 */
export default function fetchLocal(url: string): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open a GET request to the specified URL
    xhr.open('GET', url);

    // Set the response type to arraybuffer
    xhr.responseType = 'arraybuffer';

    // Define the callback function for when the request is loaded
    xhr.onload = () => {
      // Check if the request was successful
      if (xhr.status === 200) {
        // Get the arraybuffer response
        const arrayBuffer = xhr.response;

        // Parse the arraybuffer to a string using the TextDecoder
        const string = textDecoder.decode(arrayBuffer);

        // Resolve the promise with the parsed string as the response
        resolve(new Response(string, { status: 200 }));
      } else {
        // Reject the promise with an error if the request was not successful
        reject(new Error(`Failed to fetch ${url}`));
      }
    };

    // Define the callback function for when an error occurs during the request
    xhr.onerror = () => {
      // Reject the promise with an error if an error occurs
      reject(new Error(`Failed to fetch ${url}`));
    };

    // Send the request
    xhr.send();
  });
}
