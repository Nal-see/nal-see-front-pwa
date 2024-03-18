const template = (variables, { tpl }) => {
  return tpl`
  import React from 'react';
  ${variables.imports};

  ${variables.interfaces};
  
  const ${variables.componentName} = (${variables.props}) => (
    ${variables.jsx}
  );
  
  ${variables.exports};
  `;
};

module.exports = template;
