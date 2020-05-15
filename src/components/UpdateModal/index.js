import React, { useState } from 'react'
import { uploadSize, uploadBinary } from '../../helpers/requests'

export const UpdateModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectFile = (e) => {
    setFile(e.target.files[0])
  }

  const changeUploadProgress = (e) => {
    setProgress(((e.loaded / e.total) * 100).toFixed(1))
  }

  const handleUploadFile = (e) => {
    setLoading(true)
    uploadSize(file.size).then(() =>
      uploadBinary(file, changeUploadProgress).then(() => {
        setLoading(false)
        handleOpen()
      })
    )
  }

  return (
    <>
      <button title="Update" className="icon-btn" onClick={handleOpen}>
        {String.fromCodePoint(0x1F4E5)}
      </button>
      <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} />
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <h2 className="modal-heading">Upload new firmware</h2>
        <input type="file" id="modalInputField" onChange={handleSelectFile} />
        {loading && <div className="progress">progress: {progress}%</div>}
        <div className="modal-actions">
          <button
            className="button mr-1"
            disabled={loading || !file}
            onClick={handleUploadFile}
          >
            Update
          </button>
          <button className="button" disabled={loading} onClick={handleOpen}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
