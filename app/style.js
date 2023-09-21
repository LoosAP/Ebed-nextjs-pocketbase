const styles = {
  heading2:
    "font-semibold xs:text-[48px] text-[40px] text-black leading-[44px] xs:leading-[40px]",
  paragraphWhite:
    "font-opensans font-normal text-white text-[18px] leading-[30.8px]",
  paragraphBrown:
    "font-opensans font-normal text-dimBrown text-[18px] leading-[30.8px]",
  paragraphRed:
    "font-opensans font-bold text-dimRed text-[14px] pl-0 md:pl-2 leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  page: "flex flex-col items-center mx-auto min-h-screen justify-evenly pt-[40px] print:pt-0",
  // changed w-full to mx-auto
};

export const accountmangagement = {
  input:
    "border px-1 disabled:text-gray-400 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500  border-gray-400 rounded-[5px] focus:outline-none p-0.5 shadow-inner outline-transparent drop-shadow-md ",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export const listStyles = {
  list: "flex flex-row items-center justify-between py-2 border-2 border-gray-400 hover:border-gray-600",
  listHeader:
    "flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-200 border-2 border-gray-400 rounded-t-md",
};

// const animateOnScroll = (entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("animate-on-scroll");
//     }
//   });
// };

// const observer = new IntersectionObserver(animateOnScroll, {
//   threshold: 0.5,
//   rootMargin: "0px",
//   once: true,
// });

// const elements = document.querySelectorAll(".card");

// elements.forEach((element) => {
//   observer.observe(element);
// });

//uncommenteld ha azt szeretnéd, hogy csak egyszer scrolloljanak be a dolgok (i think??)

export default styles;
