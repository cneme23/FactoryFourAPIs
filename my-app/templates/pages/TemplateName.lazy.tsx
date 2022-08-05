import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense } from 'react';

const TemplateNameLazy = lazy(() => import('./TemplateName'));

const defaultProps = { children: '' };

const TemplateName = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <TemplateNameLazy {...props} />
  </Suspense>
);

TemplateName.defaultProps = defaultProps;

export default TemplateName;
