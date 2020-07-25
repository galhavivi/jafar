/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import AsyncSelect from '../../components/edit/AsyncSelect';
import { mapper } from '../../components/edit/AsyncSelect/AsyncSelect';
  
describe('AsyncSelect', () => {
  let componentProps;
  
  const jafarProps = {
    value: { value: 'ocean', label: 'Ocean' },
    disabled: false,
    required: false,
    state: { 
      placeholder: 'Color...',
      searchQuery: 'oc',
      isLoading: false,
      items:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    onValueChange: jest.fn(),
    onStateChange: jest.fn(),
  };
  

  const expectedProps = {
    value: { value: 'ocean', label: 'Ocean' },
    options: jafarProps.state.items,
    placeholder: 'Color...',
    isDisabled: false,
    isClearable: true,
    isSearchable: true,
    isLoading: false,
    inputValue: 'oc',
    styles: expect.any(Object),
    onChange: expect.any(Function),
    onInputChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(jafarProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
      Object.keys(expectedProps).forEach(key => {
        expect(componentProps[key]).toEqual(expectedProps[key]);
      });
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = expectedProps.options[1];
      componentProps.onChange([selected]);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith([jafarProps.state.items[1]]);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onInputChange - call onStateChange with correct value', () => {
      componentProps.onInputChange('ra');
      expect(jafarProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = jafarProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], searchQuery: 'ra' });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<AsyncSelect {...jafarProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
