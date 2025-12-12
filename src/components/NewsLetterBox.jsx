import React from "react";
import { useT } from "../hooks/useT";

const NewsLetterBox = () => {
  const t = useT();

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      {/* Title */}
      <p className="text-2xl font-medium text-gray-800">
        {t("newsletter_title")}
      </p>

      {/* Subtitle */}
      <p className="text-gray-400 mt-3">
        {t("newsletter_subtitle")}
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder={t("newsletter_placeholder")}
          required
        />

        <button
          className="bg-black text-white text-xs px-10 py-4"
          type="submit"
        >
          {t("newsletter_button")}
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
