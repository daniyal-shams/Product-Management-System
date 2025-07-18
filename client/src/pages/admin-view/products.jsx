import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {  createProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : "",
    salePrice : '',
    totalStock : ''
}

function AdminProducts() {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imgFile, setImgFile] = useState(null);
    const [uploadedImgUrl, setUploadedImgUrl] = useState(''); 
    const [imgLoadingState, setImgLoadingState] = useState(false);
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch();
    const {toast} = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(createProduct({
            ...formData,
            image : uploadedImgUrl,
        })).then((data)=>{
            console.log(data);
            if(data?.payload?.success) {
                dispatch(fetchAllProducts());
                setOpenCreateProductDialog(false)
                setImgFile(null);
                setFormData(initialFormData);
                toast({
                    title : 'Product add successfully'
                })
            }
            
        })
    }

    useEffect(()=>{
        dispatch(fetchAllProducts());
    },[dispatch]);

    console.log(productList,uploadedImgUrl , "Product List")

    return ( 
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=>setOpenCreateProductDialog(true)} >Add New Products</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={()=>{
                setOpenCreateProductDialog(false)
            }} >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader >
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        imgFile={imgFile} 
                        setImgFile={setImgFile} 
                        uploadedImgUrl={uploadedImgUrl}
                        setUploadedImgUrl={setUploadedImgUrl}
                        setImgLoadingState={setImgLoadingState}
                        imgLoadingState={imgLoadingState}
                        />
                    <div className="py-6">
                        <CommonForm 
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            formControls={addProductFormElements}
                            buttonText='Add'
                        />
                      
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
     );
}

export default AdminProducts;