'use client'; 
import React from 'react';
import styled from 'styled-components';

export const OtpCodeBoxField = styled.input`
  padding: 14px 75px 14px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 94px;
  width: 94px;
  border-radius: 10px;
  background: white;
  border: 1px solid #01B3BB;

  @media only screen and (max-width: 576px) {
    height: 60px;
    width: 60px;
  }

  @media only screen and (max-width: 348px) {
    height: 40px;
    width: 40px;
  }
`;

export const TextInputFieldLong = styled.input`
width: 650px;
height: 50px;
align-items: center;
border-radius: 10px;
border: 1px solid #01b3bb;
padding: 14px 75px 14px 20px;

// & ::placeholder{
//   color: rgba(30, 30, 30, 0.7);
//   font-family: Inter;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// }
`;

export const TextInputFieldShort = styled.input`
width: 300px;
height: 50px;
align-items: center;
border-radius: 10px;
border: 1px solid #01b3bb;
padding: 14px 25px 14px 20px;
`

export const TextAreaField = styled.textarea`
width: 650px;
// height: 50px;
align-items: center;
border-radius: 10px;
border: 1px solid #01b3bb;
padding: 14px 75px 14px 20px;
resize: none;
`;

export const ImageInputContainer = styled.label`
  width: 650px;
  height: 260px;
  border: 1px dashed #01b3bb;
  align-items: center;
  background: #F9F9F9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  position: relative; /* Make the position of the container relative to position the camera icon */
`;