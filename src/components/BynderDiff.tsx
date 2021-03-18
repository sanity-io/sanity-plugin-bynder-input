import React from 'react';
import { DiffFromTo, SchemaType } from '@sanity/field/diff';
import styles from './ImagePreview.css';

type ComponentProps = {
  value: any;
};

function Component({ value }: ComponentProps) {
  if (value && value.previewUrl) {
    return (
      <div>
        <img alt="preview" src={value.previewUrl} style={{ width: '100%' }} />
      </div>
    );
  }
  return (
    <div className={styles.noImage}>
      <div>(no image)</div>
    </div>
  );
}

type DiffProps = {
  diff: any;
  schemaType: SchemaType;
};

const BynderDiff = ({ diff, schemaType }: DiffProps) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={Component}
    />
  );
};

export default BynderDiff;
