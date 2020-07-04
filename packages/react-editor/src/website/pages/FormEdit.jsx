/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import { FormEditor } from '../../components';
import components from '../components';
import database from '../database';

const FormEdit = ({ match, history }) => {
  const [form, setForm] = useState();
  const [formIds, setFormIds] = useState();

  useEffect(() => {
    const forms = database.searchEntity('form') || {};
    const form = forms[match.params.formId] || {};
    setForm(form);
    setFormIds(Object.keys(forms));
  }, [match.params.formId]);

  const onCancel = () => history.push({ pathname: `/form` });

  const onSave = ({ data }) => {
    database.setEntity('form', data.model.id, data);
    onCancel();
  };

  return form ? (<FormEditor 
    form={form}
    formIds={formIds}
    components={components}
    onSave={onSave} 
    onCancel={onCancel} />) : (null);
};

export default FormEdit;