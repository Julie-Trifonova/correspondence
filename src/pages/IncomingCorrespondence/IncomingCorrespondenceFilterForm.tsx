import React from "react";

import {Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";

import {getDocumentsFilter} from "../../redux/documentsSelectors";
import {FilterType} from "../../redux/incomingCorrespondenceReducer";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import AutocompleteIntroduction from "./SearchFilter";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import s from './IncomingCorrespondenceFilterForm.module.css'

type FormType = {
    term: string;
    type: string;
};
const filterFormValidate = (values: any) => {
    const errors = {};
    return errors;
};
type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

export const IncomingCorrespondenceFilterForm: React.FC<PropsType> = ({
                                                                          onFilterChanged,
                                                                      }) => {
    const filter = useSelector(getDocumentsFilter);

    const onSubmit = (
        values: FormType,
        {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            type: values.type,
        };
        onFilterChanged(filter);
        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    term: filter.term,
                    type: filter.type,
                }}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validate={filterFormValidate}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field className={s.text_box} name="term" type="text"/>
                        <Field className={s.filter_box} name="type" as="select">
                            <option className={s.select} value={""}>Все документы</option>
                            <option className={s.select} value={"q"}>Совпадения в тексте</option>
                            <option className={s.select} value={"name"}>Название</option>
                            <option className={s.select} value={"urgency"}>Срочность</option>
                            <option className={s.select} value={"registrationNumber"}>Регистрационный номер</option>
                            <option className={s.select} value={"updateTime"}>Дата обновления</option>
                            <option className={s.select} value={"registrationDate"}>Дата регистрации</option>
                            <option className={s.select} value={"deliveryDate"}>Дата получения</option>
                        </Field>
                            <ArrowDropDownIcon />
                        <IconButton type="submit" disabled={isSubmitting} color="success" aria-label="search and filter">
                            <SearchIcon />
                        </IconButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
