import React from 'react';
import { DocsTitle, DocsParagraph } from '../common/DocsCommon';
import ExternalLink from '../common/ExternalLink';

function GeneralContribute (props) {
  return (
    <>
      <DocsTitle>How to contribute</DocsTitle>
      <DocsParagraph>Please, contact <ExternalLink href="mailto:a.ledovsky@skoltech.ru">Alexander Ledovsky</ExternalLink></DocsParagraph>
    </>
  )
}

export default GeneralContribute;