import React, {useState} from "react";

import {Field, Form, Formik, useField} from "formik";
import {useSelector} from "react-redux";

import {getDocumentsFilter} from "../../redux/documentsSelectors";
import {FilterType} from "../../redux/incomingCorrespondenceReducer";
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import s from './IncomingCorrespondenceFilterForm.module.css'
import FormControl from "@mui/base/FormControl";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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

export const IncomingCorrespondenceFilterForm: React.FC<PropsType> = ({onFilterChanged}) => {
    const filter = useSelector(getDocumentsFilter);
    const [inputData, setInputData] = useState({inputTerm: '', inputType: ''})

    // const onSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    //     const filter: FilterType = {
    //         term: values.term,
    //         type: values.type,
    //     };
    //     onFilterChanged(filter);
    //     setSubmitting(false);
    // };
    const onSubmit = () => {
        debugger
        const filter: FilterType = {
            term: inputData.inputTerm,
            type: inputData.inputType,
        };
        onFilterChanged(filter);
        // setSubmitting(false);
    };

    const onChangeTermInput = (e: any) => {
        console.log(e.target.value)
        setInputData({...inputData, inputTerm: e.target.value})
    }
    const onChangeTypeInput= (e: any) => {
        console.log(e.target.value)
        setInputData({...inputData, inputType: e.target.value})
    }

    const currencies = [
            { label: 'Все документы', value: "" },
            { label: 'Совпадения в тексте', value: "q" },
            { label: 'Название', value: "name" },
            { label: 'Срочность', value: "urgency" },
    ];

    return (
        <div>
                {/*<Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}}*/}
                {/*     noValidate*/}
                {/*     autoComplete="off"*/}
                {/*     // initialValues={{*/}
                {/*     //     term: filter.term,*/}
                {/*     //     type: filter.type,*/}
                {/*     // }}*/}
                {/*     // onSubmit={onSubmit}*/}
                {/*     // enableReinitialize={true}*/}
                {/*     // validate={filterFormValidate}*/}
                {/*>*/}
                    <Formik
                        initialValues={{
                            term: inputData.inputTerm,
                            type: inputData.inputType,
                        }}
                        onSubmit={onSubmit}
                        enableReinitialize={true}
                        validate={filterFormValidate}
                    >
                        {({isSubmitting}) => (
                        <Form>
                    <TextField className={s.text_box}
                               label="Outlined secondary"
                               color="secondary"
                               focused
                               name='term'
                               // placeholder=''
                        onChange={(e) => {onChangeTermInput(e)}}
                    />
                    <TextField
                        className={s.filter_box}
                        id="outlined-select-currency"
                        select
                        label="Тип сортировки"
                        defaultValue="q"
                        name='type'
                        onChange={(e) => {onChangeTypeInput(e)}}
                        // placeholder=''
                        // value
                        // checked
                        // helperText="Please select your currency"
                        >
                      {currencies.map((option) => (
                            <MenuItem className={s.select} key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>))}
                    </TextField>

                <IconButton type="submit"
                            disabled={isSubmitting}
                            color="success" aria-label="search and filter">
                    <SearchIcon />
                </IconButton>
                        </Form>
                        )}
                    </Formik>
                {/*</Box>*/}
        </div>
    );
};
