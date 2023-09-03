"use client";
import React from "react";
import styled from 'styled-components';

const DivDropDownMain = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const DivPostDropDownSelect = styled.select`
  width: 650px;
  height: 50px;
  background-color: white;
  border: 1px solid #01b3bb;
  border-radius: 10px;
  padding: 14px 25px 14px 20px;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   appearance: none;

opacity: 0.5;
`;

const DivDropDownArrow = styled.div`
  position: absolute;
  right: 26px;
  top: 10px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
`;

const LongDropDown = ({ placeholder, option }) => {
    return(
        <DivDropDownMain>
        <DivPostDropDownSelect>
          <option value="" disabled selected>
            {placeholder}
          </option>
          <option>{option}</option>
        </DivPostDropDownSelect>
        {/* <DivDropDownArrow>
        <ArrowDown/>
        </DivDropDownArrow> */}
      </DivDropDownMain>
    );
};

export default LongDropDown;