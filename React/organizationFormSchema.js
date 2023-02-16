import * as Yup from "yup";

const urlRules =  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const organizationFormSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(2)
        .max(200)
        .required("Please enter organization name"),
    description: Yup
        .string()
        .min(2)
        .max(200),
    businessPhone: Yup
        .string()
        .min(9)
        .max(20)
        .required("Phone Number is Required"),
    siteUrl: Yup
        .string()
        .matches(urlRules, 'Enter a valid url')
        .min(5)
        .max(255)
        .nullable(),

});