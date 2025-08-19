"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Components
import { ImageUploader } from "@/components/layout/dashboard/shared/inputs/ImageInput";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import uploadImageToImageBB from "@/helper/ImageUpload/ImageUpload";
import {
  useHandleFindSingleProductQuery,
  useHandleUpdateProductMutation,
} from "@/redux/features/product/productApi";

import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import Heading from "@/components/layout/dashboard/shared/Heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
// Types
interface IFormInput {
  productName: string;
  slug: string;
  productImage: string;
  description: string;
  quantity: number;
  prvPrice?: number;
  price: number;
  specialty: string[];
  shippingDhakaCity: number;
  shippingDhakaCityOuter: number;
  shippingOutsideDhaka: number;
  seoDescription: string;
  seoTag: string[];
}

interface Fields {
  label: string;
  valueKey: string;
  placeholder: string;
  type: "text" | "richtext" | "keywords" | "number";
  formType: "string" | "array" | "number";
}
interface Params {
  slug: string;
}

const fieldConfig: Fields[] = [
  {
    label: "Product Name",
    valueKey: "productName",
    placeholder: "Enter the Product Name",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Slug",
    valueKey: "slug",
    placeholder: "Enter the slug",
    type: "text",
    formType: "string",
  },
  {
    label: "Description",
    valueKey: "description",
    placeholder: "Enter the description",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Quantity",
    valueKey: "quantity",
    placeholder: "Enter the Quantity",
    type: "number",
    formType: "number",
  },
  {
    label: "Previous Price",
    valueKey: "prvPrice",
    placeholder: "Enter the Previous Price",
    type: "number",
    formType: "number",
  },
  {
    label: "Price",
    valueKey: "price",
    placeholder: "Enter the Price",
    type: "number",
    formType: "number",
  },
  {
    label: "Specialty",
    valueKey: "specialty",
    placeholder: "Enter specialty (comma separated)",
    type: "keywords",
    formType: "array",
  },
  {
    label: "Shipping — Dhaka City",
    valueKey: "shippingDhakaCity",
    placeholder: "e.g. 80",
    type: "number",
    formType: "number",
  },
  {
    label: "Shipping — Dhaka City Outer",
    valueKey: "shippingDhakaCityOuter",
    placeholder: "e.g. 99",
    type: "number",
    formType: "number",
  },
  {
    label: "Shipping — Outside Dhaka",
    valueKey: "shippingOutsideDhaka",
    placeholder: "e.g. 119",
    type: "number",
    formType: "number",
  },
  /* --------------------------------------------------------------------- */
  {
    label: "SEO Description",
    valueKey: "seoDescription",
    placeholder: "Enter the SEO Description",
    type: "text",
    formType: "string",
  },
  {
    label: "SEO Tag",
    valueKey: "seoTag",
    placeholder: "Enter SEO tags (comma separated)",
    type: "keywords",
    formType: "array",
  },
];

const getInitialMetaData = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};

const UpdatePage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdateProduct, { isLoading }] = useHandleUpdateProductMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();
  const { data: categoryData } = useHandleFindCategoryQuery({
    page: 1,
    limit: 100,
    search: "",
  });
  const categories: any[] = categoryData?.payload || [];

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data, error } = useHandleFindSingleProductQuery(slug, {
    skip: !slug, // Skip fetching if slug is not yet available
  });

  console.log({ error });

  let updatedImage = data?.payload?.productImage;
  // image

  // Resolve the params promise and set the slug
  useEffect(() => {
    const resolveParams = async () => {
      const { slug } = await params;
      if (slug) {
        setSlug(slug);
      }
    };
    resolveParams();
  }, [params, slug]);

  const defaultValues = fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") acc[field.valueKey] = [];
    else acc[field.valueKey] = "";
    return acc;
  }, {} as Record<string, any>);

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    if (!updatedImage) {
      return toast.error("Please upload at least one image.");
    }

    setIsImageUploading(true);

    try {
      if (images.length > 0) {
        const imageURLs = (
          await Promise.all(images?.map((img) => uploadImageToImageBB(img)))
        ).filter((url): url is string => !!url);
        updatedImage = imageURLs[0];
        if (imageURLs.length === 0) {
          return toast.error("Failed to upload images.");
        }
      }

      const payload = {
        id,
        productName: metaData?.productName,
        slug: metaData?.slug,
        description: metaData?.description,
        quantity: Number(metaData?.quantity),
        prvPrice: Number(metaData?.prvPrice),
        price: Number(metaData?.price),
        specialty: metaData.specialty,
        category,
        /* 🆕 ৩ টি শিপিং ফিল্ড ম্যাপ */
        shipping: {
          dhakaCity: Number(metaData.shippingDhakaCity),
          dhakaCityOuter: Number(metaData.shippingDhakaCityOuter),
          outsideDhaka: Number(metaData.shippingOutsideDhaka),
        },
        productImage: updatedImage,
        seo: {
          tag: metaData?.seoTag,
          description: metaData?.seoDescription,
        },
        
      };
      await handleUpdateProduct(payload).unwrap();
      toast.success("Data updated successfully!");
      setImages([]);
      router.push("/dashboard/manage-products");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }

    // You can send the data to an API or save it to your database here
  };

  useEffect(() => {
    if (data?.payload) {
      const payload = data.payload;

      const newMetaData = {
        productName: payload.productName || "",
        slug: payload.slug || "",
        description: payload.description || "",
        quantity: payload.quantity || "",
        prvPrice: payload.prvPrice || "",
        price: payload.price || "",
        specialty: payload.specialty || [],
        shippingDhakaCity: payload.shipping?.dhakaCity || "",
        shippingDhakaCityOuter: payload.shipping?.dhakaCityOuter || "",
        shippingOutsideDhaka: payload.shipping?.outsideDhaka || "",
        seoDescription: payload.seo?.description || "",
        seoTag: payload.seo?.tag || [],
      };

      setMetaData(newMetaData);

      // Populate history with the initial values as first entries
      const newMetaDataHistory = {
        productName: payload.productName || "",
        slug: payload.slug || "",
        description: payload.description || "",
        quantity: payload.quantity || "",
        prvPrice: payload.prvPrice || "",
        price: payload.price || "",
        specialty: payload.specialty || [],
        shippingDhakaCity: payload.shipping?.dhakaCity || "",
        shippingDhakaCityOuter: payload.shipping?.dhakaCityOuter || "",
        shippingOutsideDhaka: payload.shipping?.outsideDhaka || "",
        seoDescription: payload.seo?.description || "",
        seoTag: payload.seo?.tag || [],
      };

      setMetaDataHistory(newMetaDataHistory);

      // Set form values
      methods.reset({
        productName: payload.productName || "",
        slug: payload.slug || "",
        description: payload.description || "",
        quantity: payload.quantity || "",
        prvPrice: payload.prvPrice || "",
        price: payload.price || "",
        specialty: payload.specialty || [],
        shippingDhakaCity: payload.shipping?.dhakaCity || "",
        shippingDhakaCityOuter: payload.shipping?.dhakaCityOuter || "",
        shippingOutsideDhaka: payload.shipping?.outsideDhaka || "",
        seoDescription: payload.seo?.description || "",
        seoTag: payload.seo?.tag || [],
      });

      setId(payload._id);
      setCategory(payload.category);
    }
  }, [data, methods]);

  return (
    <div>
      <Heading
        title="Update product"
        subTitle="Please update your product content."
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />

          {/* Category select */}
          <div>
            <FormLabel className="mb-2">Category</FormLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader
              images={images}
              setImages={setImages}
              mode="update"
              multiple={false}
              defaultImages={
                data?.payload?.productImage ? [data?.payload?.productImage] : []
              }
            />
          </FormItem>

          <Button
            type="submit"
            // className="w-full sm:w-auto"
            disabled={isLoading || isImageUploading}
            className={`rounded-none mr-5 ${
              isLoading || isImageUploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading || isImageUploading
              ? "Please Wait..."
              : "Update Product"}
          </Button>

          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </FormProvider>
      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default UpdatePage;
