// stores/productDataStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductDataStore = defineStore("productDataStore", () => {
  const productImg = {
    img1: "https://mufc-live.cdn.scayle.cloud/images/d62dd5c818107d84115a36a9e9191b95.jpg",
    img2: "https://mufc-live.cdn.scayle.cloud/images/e35cd1835b85cf3a0d1e13456751aa6c.jpg",
    img3: "https://mufc-live.cdn.scayle.cloud/images/e9af2729edd15402afd7883f9d621f43.jpg",
    img4: "https://mufc-live.cdn.scayle.cloud/images/8644a21717141cef99919b3a7045ec2b.jpg",
    img5: "https://mufc-live.cdn.scayle.cloud/images/d4a8d031a4f3352b77332df2f9476a19.jpg",
    img6: "https://mufc-live.cdn.scayle.cloud/images/8c1e355f50f8e08677578d9e92100995.jpg",
    img7: "https://mufc-live.cdn.scayle.cloud/images/b6b12c9c495ab18638a4d60629b20ba5.jpg",
  };

  const sizes = ["XS", "S", "M", "L", "XL"];
  const selectedSize = ref("");
  const productDetails = {
    color: "Green",
    material: "100% cotton",
    brand: "Adidas",
    price: 50,
    description:
      "Show what your club means to you with every step. Made from soft French terry fabric and finished with ribbed cuffs, these adidas Manchester United pants offer snug comfort for the home. An embroidered team crest on one leg shows your football pride.",
  };

  const selectSize = (size: string) => {
    selectedSize.value = size;
    console.log("Selected size:", size);
  };

  return {
    productImg,
    sizes,
    selectedSize,
    productDetails,
    selectSize,
  };
});
