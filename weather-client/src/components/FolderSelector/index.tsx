import { useField } from "formik";
import { useState } from "react";

const FolderSelector = ({ field }) => {
  const [, , helpers] = useField(field);
  const [folder, setFolder] = useState("Browse...");
  const handleFolderSelect = (event) => {
    const selectedFolder = event.target.files[0];
    const folderPath = selectedFolder.webkitRelativePath.split("/")[0];
    setFolder(folderPath);
    // Assuming you want to set the selected folder path to the form field
    helpers.setValue(folderPath);
  };

  return (
    <div>
      <label htmlFor="folderInput">Select a Folder:</label>
      <input
        type="file"
        id="folderInput"
        webkitdirectory="true"
        onChange={handleFolderSelect}
        style={{ display: "none" }}
      />
      <input
        type="button"
        className="browse"
        value={folder}
        onClick={() => {
          document.getElementById("folderInput").click();
        }}
      />
    </div>
  );
};

export default FolderSelector;
