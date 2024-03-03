const getUploadBtn = () => document.getElementById("upload-btn");
const getUploadForm = () => document.getElementById("upload-form");
const getFileInput = () => document.getElementById("file-input");

const upload = () => {
  const formData = new FormData();
  const fileInput = getFileInput();

  const reader = new FileReader();
  const fileContent = fileInput.files[0];
  formData.append("fileContent", fileContent);

  reader.onload = (event) => {
    console.log("event ", event);
    const fileContent = event.target.result;

    console.log("file content", fileContent);

    sendFormData(formData);
  };

  reader.readAsDataURL(fileContent);
};

const sendFormData = (formData) => {
  const endPoint = "http://localhost:8080/uploadImage";

  fetch(endPoint, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error("Error:", error));
};

const setUpOnUpload = (uploadBtn, fileInput) => {
  console.log("hello");

  const uploadForm = getUploadForm();

  uploadForm.addEventListener("submit", (e) => {
    console.log("submit form");

    e.preventDefault();
    upload(uploadForm);
  });
};

// const uploadImage = () => {
//   const input = document.getElementById('imageInput');
//   const file = input.files[0];

//   if (file) {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//           const base64Image = e.target.result.split(',')[1];
//           const data = { base64Image };

//           fetch('http://localhost:8080/uploadImage', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(data),
//           })
//           .then(response => response.text())
//           .then(message => alert(message))
//           .catch(error => console.error('Error:', error));
//       };

//       reader.readAsDataURL(file);
//   } else {
//       alert('Please select an image.');
//   }
// }

function downloadImage() {
  fetch("http://localhost:8080/downloadImage")
    .then((response) => response.json())
    .then((data) => {
      const imgElement = document.getElementById("downloadedImg");
      imgElement.src = "data:image/jpeg;base64," + data.base64Image;
    })
    .catch((error) => console.error("Error:", error));
}

const main = () => {
  const uploadBtn = getUploadBtn();
  setUpOnUpload();
};

window.onload = main;
