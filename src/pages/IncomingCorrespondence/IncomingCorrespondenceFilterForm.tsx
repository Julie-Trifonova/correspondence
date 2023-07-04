import React from "react";

import {Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";

import {getDocumentsFilter} from "../../redux/documentsSelectors";
import {FilterType} from "../../redux/incomingCorrespondenceReducer";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";



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
                        <Field name="term" type="text"/>
                        <Field name="type" as="select">
                            <option value={""}>Все документы</option>
                            <option value={"q"}>Совпадения в тексте</option>
                            <option value={"name"}>Название</option>
                            <option value={"urgency"}>Срочность</option>
                            <option value={"registrationNumber"}>Регистрационный номер</option>
                            <option value={"updateTime"}>Дата обновления</option>
                            <option value={"registrationDate"}>Дата регистрации</option>
                            <option value={"deliveryDate"}>Дата получения</option>
                        </Field>
                        <IconButton type="submit" disabled={isSubmitting} color="success" aria-label="search and filter">
                            <SearchIcon />
                        </IconButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
