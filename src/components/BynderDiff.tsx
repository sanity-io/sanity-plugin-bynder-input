import React from 'react';
import { DiffFromTo, SchemaType } from 'sanity';
import { Flex } from '@sanity/ui';

type ComponentProps = {
  value: any;
};

function Component({ value }: ComponentProps) {
  if (value?.previewUrl || value?.previewImg) {
    return (
      <Flex justify="center" align="center" height="fill" width="fill">
        <img
          alt="preview"
          src={value?.previewImg ?? value?.previewUrl}
          style={{
            objectFit: 'contain',
            margin: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" height="fill" width="fill">
      <div>(no image)</div>
    </Flex>
  );
}

type DiffProps = {
  diff: any;
  schemaType: SchemaType;
};

export const BynderDiff = ({ diff, schemaType }: DiffProps) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={Component}
      layout={'grid'}
    />
  );
};
