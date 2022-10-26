module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?'
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'cssFile',
        // Prompt to display on command line
        message: 'includes css.module ?',
        default: true
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'testFile',
        // Prompt to display on command line
        message: 'includes test file ?',
        default: true
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile:
            'plop-templates/Component/Component.tsx.hbs',
        },
        // {
        //   type: 'add',
        //   path: 'src/components/{{camelCase name}}/__tests__/{{pascalCase name}}.test.tsx',
        //   templateFile:
        //     'plop-templates/Component/Component.test.tsx.hbs',
        // },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/index.ts',
          templateFile: 'plop-templates/Component/index.ts.hbs',
        },

      ];
      if(data.cssFile){
        actions.push({
          type: 'add',
          path: 'src/components/{{camelCase name}}/style/{{pascalCase name}}.module.css',
          templateFile: 'plop-templates/Component/Component.module.css.hbs',
        })
      }
      if(data.testFile){
        actions.push({
          type: 'add',
          path: 'src/components/{{camelCase name}}/__tests__/{{pascalCase name}}.test.tsx',
          templateFile:
            'plop-templates/Component/Component.test.tsx.hbs',
        })
      }
      return actions;
    },
  });
  plop.setGenerator('page', {
    description: 'Create a page',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your route name?'
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'isPrivate',
        // Prompt to display on command line
        message: 'is it a private page?'
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'isDashboard',
        // Prompt to display on command line
        message: 'is it a dashboard page (yes to includes the dashboard layout) ?'
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'cssFile',
        // Prompt to display on command line
        message: 'includes css.module ?',
        default: true
      },
      {
        // Raw text input
        type: 'confirm',
        // Variable name for this input
        name: 'testFile',
        // Prompt to display on command line
        message: 'includes test file ?',
        default: true
      },
      
    ],
    actions: function(data){
      const actions = [
        {
          type: 'add',
          path: 'pages_/{{camelCase name}}.tsx',
          templateFile:
            'plop-templates/Page/page.tsx.hbs',
        },
        {
          type: 'add',
          path: 'src/screens/{{camelCase name}}/index.ts',
          templateFile: 'plop-templates/Page/Screen/index.ts.hbs',
        },
        {
          type: 'add',
          path: 'src/screens/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile:
            'plop-templates/Page/Screen/Screen.tsx.hbs',
        },
      ];
      if(data.cssFile){
        actions.push({
          type: 'add',
          path: 'src/screens/{{camelCase name}}/style/{{pascalCase name}}.module.css',
          templateFile: 'plop-templates/Page/Screen/Screen.module.css.hbs',
        })
      }
      if(data.testFile){
        actions.push({
          type: 'add',
          path: 'src/screens/{{camelCase name}}/__tests__/{{pascalCase name}}.test.tsx',
          templateFile:
            'plop-templates/Page/Screen/Screen.test.tsx.hbs',
        })
      }
      return actions;
    },
  });
  plop.setGenerator('reducer', {
    description: 'Create a reducer',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your reducer name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/reducers/{{camelCase name}}/{{camelCase name}}.reducer.ts',
        templateFile:
          'plop-templates/Reducer/Reducer.reducer.ts.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/store/store.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `
// -- import {{camelCase name}} reducer
import {{camelCase name}}Reducer from './reducers/{{camelCase name}}/{{camelCase name}}.reducer'
// -- export {{camelCase name}} actions & selectors
export { {{camelCase name}}Actions, {{camelCase name}}Selectors } from './reducers/{{camelCase name}}/{{camelCase name}}.reducer';`,
      },
      {
        type: 'add',
        path: 'src/store/reducers/{{camelCase name}}/{{camelCase name}}.selectors.ts',
        templateFile:
          'plop-templates/Reducer/Reducer.selectors.ts.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/store/store.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_COMBINE */`,
        template: `  {{camelCase name}}: {{camelCase name}}Reducer,`
      },
    ],
  });
};