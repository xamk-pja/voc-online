
 // Action calls this method when submitting data
 export const fileUpload = (e) => {
  e.preventDefault();
  const fileForm = document.getElementById('FileUploadForm');
  const file = fileForm['file'].files[0];

  if (file !== "") {
    const data = new FormData();
    data.append('fileDesc', fileForm.fileDesc.value);
    data.append('file', file);
    data.append('filename', file.name);
    data.append('parentId', fileForm.parentId.value);
    this.props.mappedFileUpload(data);
  }
  else {
    return;
  }
}


// Action calls this method when submitting data
export const fileEdit = (e) => {
  e.preventDefault();
  const fileForm = document.getElementById('FileEditForm');
  const file = fileForm['file'].files[0];

  if (file !== "") {
    const data = new FormData();
    data.append('fileDesc', fileForm.fileDesc.value);
    this.props.mappedFileUpload(data);
  }
  else {
    return;
  }
}
