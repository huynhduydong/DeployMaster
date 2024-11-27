import dynamic from "next/dynamic";

const DynamicImagePicker = dynamic(() => import("./ImagePicker"), {
  ssr: false,
});

export default DynamicImagePicker;