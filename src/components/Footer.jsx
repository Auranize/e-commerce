import React from "react";
import { Link } from "react-router-dom";
import { useT } from "../hooks/useT";

const Footer = () => {
  const t = useT();

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* About Section */}
        <div>
          <p className="text-3xl font-bold mb-5 text-gray-800">
            {t("footer_brand_name")}
          </p>
          <p className="w-full md:w-2/3 text-gray-600">
            {t("footer_about_text")}
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">{t("footer_company_title")}</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/">{t("footer_home")}</Link></li>
            <li><Link to="/about">{t("footer_about")}</Link></li>
            <li><Link to="/collection">{t("footer_collection")}</Link></li>
            <li><Link to="/contact">{t("footer_contact")}</Link></li>
            <a target="_blank" href="https://tally.so/r/wMP6vA">{t("footer_feedback")}</a>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <p className="text-xl font-medium mb-5">{t("footer_policies_title")}</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/payment-policy">{t("footer_payment_policy")}</Link></li>
            <li><Link to="/refund-policy">{t("footer_refund_policy")}</Link></li>
            <li><Link to="/shipping-policy">{t("footer_shipping_policy")}</Link></li>
            <li><Link to="/terms-and-conditions">{t("footer_terms")}</Link></li>
            <li><Link to="/privacy-policy">{t("footer_privacy")}</Link></li>
            <li><Link to="/warranty-policy">{t("footer_warranty")}</Link></li>
            <li><Link to="/return-policy">{t("footer_return")}</Link></li>
            <li><Link to="/faqs">{t("footer_faq")}</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-5">
            {t("footer_contact_title")}
          </p>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>📍 {t("footer_address")}</li>
            <li>
              📧 <a>support@watchlab.in</a>
            </li>
            <li>
              📞{" "}
              <a href="tel:+918075725539" className="hover:underline">
                +91 8075725539
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {t("footer_copyright")}{" "}
          <a href="https://watchlab.in" className="font-medium text-gray-800">
            watchlab.in
          </a>{" "}
          - {t("footer_rights")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
