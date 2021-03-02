declare module 'part:@sanity/components/buttons/default' {
  import * as React from 'react';
  interface Props {
    color?: string;
    children?: any;
    onClick?: any;
    inverted?: boolean;
    disabled?: boolean;
    title?: string;
    kind?: 'default' | 'simple';
  }
  export default class DefaultButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/buttons/button-grid' {
  import * as React from 'react';
  interface Props {
    align?: string;
  }
  export default class ButtonGrid extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/fieldsets/default' {
  const shim: any;
  export default shim;
}

declare module 'config:bynder-input' {
  type BynderInputConfig = {
    portalDomain?: string;
    language?: string;
  };
  const shim: BynderInputConfig;
  export default shim;
}
