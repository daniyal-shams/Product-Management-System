import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";



function ProductImageUpload({imgFile, setImgFile , uploadedImgUrl, setUploadedImgUrl, setImgLoadingState} ) {

    const inputRef = useRef(null);

    function handleImgFileChange(event) {
        console.log(event.target.files) ;
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImgFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault() ;
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImgFile(droppedFile)
    }

    function handleRemoveImg() {
        setImgFile(null);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    async function uploadImgToCloud() {
        setImgLoadingState(true);
        const data = new FormData();
        data.append('my_file', imgFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-img', data);
        console.log(response.data);
        if(response.data?.success) {
            setUploadedImgUrl(response.data.result.url)
            setImgLoadingState(false);
        }
            
    }

    useEffect(()=> {
        if(imgFile !== null) uploadImgToCloud() 
    },[imgFile]);

    return ( 
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop}  className="border-2 border-dashed rounded-lg p-4">
                <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImgFileChange} />
                  {
                    !imgFile ?
                    <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label> : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className="w-8 text-primary mr-2 h-8"/>
                            </div>
                        <p className="text-sm font-medium">{imgFile.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImg} >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                        </div>) 
                    }
            </div>
        </div>
     );
}

export default ProductImageUpload;