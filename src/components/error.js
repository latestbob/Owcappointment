import React from 'react';
import { ErrorMessage } from "@hookform/error-message";


export const ErrorMsg = ({ errors, name }) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-danger font-size-10 mb-0 "style={{
              fontSize:"12px",
              fontWeight:"600"

          }}>{message}</p>
        )}
      />
    );
  };