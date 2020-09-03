/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode, useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
    onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
    const [fileSelected, setFileSelected] = useState(false);

    function renderDragMessage(
        isDragActive: boolean,
        isDragRejest: boolean,
    ): ReactNode {
        if (!isDragActive) {
            return (
                <UploadMessage>
                    Selecione ou arraste o arquivo aqui.
                </UploadMessage>
            );
        }

        if (isDragRejest) {
            return (
                <UploadMessage type="error">
                    Arquivo não suportado
                </UploadMessage>
            );
        }

        return (
            <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>
        );
    }

    const onDrop = useCallback(
        acceptedFiles => {
            if (!acceptedFiles.length) return;

            setFileSelected(true);
            onUpload(acceptedFiles);
        },
        [onUpload],
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: '.csv, text/csv, application/vnd.ms-excel',
    });

    return (
        <>
            <DropContainer
                {...getRootProps()}
                isDragActive={isDragActive}
                iisDragReject={isDragReject}
            >
                <input {...getInputProps()} data-testid="upload" />

                {fileSelected ? (
                    <div>
                        <p>
                            Arquivo selecionado! Clique em "Enviar" para
                            importar a(s) transação(ões)
                        </p>
                    </div>
                ) : (
                    renderDragMessage(isDragActive, isDragReject)
                )}
            </DropContainer>

            {/* <Dropzone
                accept="application/vnd.ms-excel"
                onDropAccepted={files => console.log(files)}
            >
                {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                }): any => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} data-testid="upload" />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone> */}
        </>
    );
};

export default Upload;
