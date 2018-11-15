const apiUrl = "/api/files/";

/*
 * File upload: TODO: fix upload if many uploads are done in the row
 */
export const showFileUploadModal = (parentId) => {
  if (parentId !== null) {
    return {
      type: 'SHOW_FILE_UPLOAD_MODAL',
      fileParent: parentId
    }
  }
}

export const hideFileUploadModal = () => {
  return {
    type: 'HIDE_FILE_UPLOAD_MODAL'
  }
}

export const addNewFileRequest = (file) => {
  return {
    type: 'ADD_NEW_FILE_REQUEST',
    file
  }
}

export const addNewFileRequestSuccess = (addedfile, parentobj, message) => {
  return {
    type: 'ADD_NEW_FILE_REQUEST_SUCCESS',
    fileParent: parentobj,
    file: addedfile,
    successMsg: message
  }
}

export const addNewFileFailed = (error) => {
  return {
    type: 'ADD_NEW_FILE_FAILED',
    error
  }
}


export const fileDownload = (file, name) => {
  return () => {
    fetch(apiUrl + file)
    .then((resp) => resp.blob()) // Transform the data to blob
    .then(function(data) {
      let a = document.createElement("a");
      // let blobURL = URL.createObjectURL(data, { oneTimeOnly: true });
      // name = name.replace(/,/g , "");
      // a.download = name;
      
      var blobURL = window.URL.createObjectURL(data, { oneTimeOnly: true });

      a.href = blobURL;
      document.body.appendChild(a);
      a.setAttribute('target', '_blank');
      a.download = name;
      a.click();
      document.body.removeChild(a);
    })
  }
}

export const fileUpload = (file) => {
  return (dispatch) => {
    dispatch(addNewFileRequest(file));

    fetch(apiUrl, {
      method: 'post',
      body: file,

    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(addNewFileRequestSuccess(data.newfile, data.updatedObj, data.message))
        })
      }
      else {
        response.json().then(error => {
          dispatch(addNewFileFailed(error))
        })
      }
    })
  }
}

/**
 * EDIT FILE
 */
export const editFileRequest = (fileToEdit) => {
  return {
    type: 'EDIT_FILE_REQUEST',
    fileToEdit: fileToEdit
  }
}

export const editFileRequestSuccess = (fileToEdit, message) => {
  return {
    type: 'EDIT_FILE_REQUEST_SUCCESS',
    fileToEdit: fileToEdit,
    fileParent: fileToEdit.parentId,
    successMsg: message
  }
}

export const editFileFailed = (error) => {
  return {
    type: 'EDIT_FILE_FAILED',
    error
  }
}

export const fileEdit = (data) => {
  return (dispatch) => {
    dispatch(editFileRequest(data));
    return fetch(apiUrl, {
      method: 'put',
      body: data
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(editFileRequestSuccess(data.fileToEdit, data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(editFileFailed(error));
        })
      }
    })
  }
}

export const showFileEditModal = (fileToEdit) => {
  if (fileToEdit !== null) {
    return {
      type: 'SHOW_FILE_EDIT_MODAL',
      fileToEdit: fileToEdit
    }
  }
}

export const hideFileEditModal = () => {
  return {
    type: 'HIDE_FILE_EDIT_MODAL'
  }
}

/**
 *    FILE DELETIONS 
 */
export const showFileDeleteModal = (fileToDelete) => {
  if (fileToDelete !== null) {
    return {
      type: 'SHOW_FILE_DELETE_MODAL',
      fileToDelete: fileToDelete
    }
  }
}

export const hideFileDeleteModal = () => {
  return {
    type: 'HIDE_FILE_DELETE_MODAL'
  }
}

export const deleteFile = (file) => {
  return (dispatch) => {
    dispatch(deleteFileRequest(file));
    return fetch(apiUrl + file._id + "/" + file.parentId, {
      method: 'delete'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch(deleteFileSuccess(data.objid, data.pid, data.message));
        })
      }
      else {
        response.json().then(error => {
          dispatch(deleteFileFailed(error));
        })
      }
    })

  }
}

export const deleteFileRequest = (file) => {
  return {
    type: 'DELETE_FILE_REQUEST',
    file
  }
}

export const deleteFileSuccess = (objid, pid, message) => {
  return {
    type: 'DELETE_FILE_REQUEST_SUCCESS',
    fileToDelete: objid,
    fileParent: pid,
    successMsg: message
  }
}

export const deleteFileFailed = (error) => {
  return {
    type: 'DELETE_FILE_FAILED',
    error
  }
}