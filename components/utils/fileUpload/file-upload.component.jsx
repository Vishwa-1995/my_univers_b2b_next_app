import React, {useEffect, useRef,} from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    VideoPreview
} from "./file-upload.styles";
import {useField, useFormikContext} from "formik";
import {_setImage} from "../utils";
import {IMAGE_SIZE} from "../constant";
import Image from "next/image";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = IMAGE_SIZE;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
                        label,
                        name,
                        maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
                        ...otherProps
                    }) => {
        const fileInputField = useRef(null);
        const {setFieldValue} = useFormikContext();
        const [field, meta] = useField(name);

        const handleUploadBtnClick = () => {
            fileInputField.current.click();
        };

        const addNewFiles = (newFiles) => {
            let totalFileSize = field.value?.reduce(
                (accumulator, curValue) => {
                    return accumulator + curValue.size
                }, 0);

            for (let file of newFiles) {
                totalFileSize += file.size;
                if (totalFileSize <= maxFileSizeInBytes) {
                    if (!otherProps.multiple) {
                        return [file];
                    }
                    field.value = [...field.value, file];
                }
            }

            return [...field.value];
        };

        useEffect(() => {
            if (field.value && typeof field.value.name == 'string') {
                let updatedFiles = addNewFiles([field.value]);
                setFieldValue(name, updatedFiles);
            }
        }, [field.value])

        const handleNewFileUpload = (e) => {
            const {files: newFiles} = e.target;
            if (newFiles.length) {
                let updatedFiles = addNewFiles(newFiles);
                setFieldValue(name, updatedFiles);
            }
        };

        const removeFile = (fileIndex) => {
            field.value.splice(fileIndex, 1);
            setFieldValue(name, field.value);
        };

        // Generating Cropped Image When Done Button Clicked
        const onCropDone = (imgCroppedArea, image, fileName) => {
            const canvasEle = document.createElement("canvas");
            canvasEle.width = imgCroppedArea.width;
            canvasEle.height = imgCroppedArea.height;

            const context = canvasEle.getContext("2d");

            let imageObj1 = new Image();
            imageObj1.src = image;
            imageObj1.onload = function () {
                context.drawImage(
                    imageObj1,
                    imgCroppedArea.x,
                    imgCroppedArea.y,
                    imgCroppedArea.width,
                    imgCroppedArea.height,
                    0,
                    0,
                    imgCroppedArea.width,
                    imgCroppedArea.height
                );

                const dataURL = canvasEle.toDataURL();

                _setImage(
                    dataURL,
                    fileName
                ).then((value => {
                    let updatedField = field.value.map(obj => obj.name === fileName ? value : obj);
                    setFieldValue(name, updatedField);
                }));
            };
        };

        // Handle Cancel Button Click
        const onCropCancel = () => {
        };

        return (
            <div className="flex flex-col gap-[30px] mt-[40px] ">
                <div className="flex flex-col justify-items-center">
                    <div className="w-full">
                        <div className="flex justify-center flex-col">
                            <div className="flex flex-row  text-[#959595] font-[600] text-[12px] ">
                                {label}
                            </div>
                        </div>
                        <div className="flex justify-center flex-col">
                            <FileUploadContainer>
                                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                                <UploadFileBtn type="button" onClick={handleUploadBtnClick}
                                               disabled={otherProps.disabled}>
                                    <div className="flex flex-row justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="upload">
                                            <path
                                                fill="#01B3BB"
                                                stroke="white"
                                                d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"></path>
                                        </svg>
                                        <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                                    </div>
                                </UploadFileBtn>
                                <FormField
                                    type="file"
                                    ref={fileInputField}
                                    onChange={handleNewFileUpload}
                                    title=""
                                    value=""
                                    {...otherProps}
                                />
                            </FileUploadContainer>
                        </div>
                        <div className="flex justify-center flex-col">
                            <FilePreviewContainer>
                                {/* <span>To Upload</span> */}
                                <PreviewList>
                                    {field.value?.map((file, index) => {
                                        let isPdfFile = file?.type === "application/pdf";
                                        let isImageFile = file?.type?.split("/")[0] === "image";
                                        let isVideoFile = file?.type?.split("/")[0] === "video";

                                        return (
                                            <div key={file.name} style={{marginTop: 1}}>
                                                <div style={{position: 'relative'}}>
                                                    {URL.createObjectURL(file) &&
                                                        <button className="close-button" aria-label="Close alert"
                                                                type="button"
                                                                style={{
                                                                    right: '0px',
                                                                    position: 'absolute',
                                                                    zIndex: '1',
                                                                    backgroundColor: '#01B3BB',
                                                                    width: 20,
                                                                    height: 20,
                                                                    borderRadius: '50%',
                                                                    display: "flex",
                                                                    justifyContent: 'center',
                                                                    alignItems: "center"
                                                                }}
                                                                onClick={() => removeFile(index)}>
                                                            <span aria-hidden="true"
                                                                  style={{color: "white", fontSize: 20}}>&times;</span>
                                                        </button>
                                                    }
                                                    <PreviewContainer>
                                                        <div>
                                                            {isPdfFile && (
                                                                <ImagePreview
                                                                    src='https://dsuabgmmtxmj1.cloudfront.net/common/pdf_file_icon.png'
                                                                    alt={`file preview ${index}`}
                                                                />
                                                            )}
                                                            {isImageFile && (
                                                                <ImagePreview
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`file preview ${index}`}
                                                                />
                                                            )}
                                                            {isVideoFile && (
                                                                <VideoPreview
                                                                    alt={`file preview ${index}`}
                                                                    autoplay muted
                                                                >
                                                                    <source src={URL.createObjectURL(file)}
                                                                            type={file?.type}></source>
                                                                </VideoPreview>
                                                            )}
                                                            <FileMetaData isPdfFile={isPdfFile} isImageFile={isImageFile}
                                                                          isVideoFile={isVideoFile}>
                                                                <div
                                                                    className=" text-white flex text-left font-montserrat text-[12px] font-semibold leading-tight h-[44.304px] mb-[20px]"
                                                                    style={{
                                                                        fontWeight: 'bold'
                                                                    }}>{(((file.name).substring(0, 12)) + (file.name.length > 12 ? '...' : ''))}
                                                                </div>
                                                                <aside>
                                                                    <div
                                                                        className=" text-white flex text-left font-montserrat text-[12px] font-semibold leading-tight h-[44.304px] mb-[20px]">{convertBytesToKB(file.size)} kb
                                                                    </div>
                                                                </aside>
                                                            </FileMetaData>
                                                        </div>
                                                    </PreviewContainer>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </PreviewList>
                            </FilePreviewContainer>
                        </div>
                        <div className="flex justify-center flex-col">
                            {meta && meta.error ? <span
                                className="text-xs text-red-400">{meta.error}</span> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default FileUpload;