module.exports = {
	root: true,
	env: {
	  node: true,
	  jest: true
	},
	extends: ["plugin:vue/essential", "@vue/prettier"],
	rules: {
	  "no-console": "off",
	  // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
	  // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	  "prettier/prettier": ['error', {
		singleQuote: true,
		semi: true,
		useTabs: false,
		tabWidth: 4,
		trailingComma: 'all',
  /*
  "es5" -ES5에서 유효한 후행 쉼표 (객체, 배열 등)
  "none" -뒤에 쉼표가 없습니다.
  "all"-가능한 경우 후행 쉼표 ( 함수 매개 변수 목록 및 호출의 후행 쉼표 포함 ). 이를 위해서는 노드 8 또는 ES2017을 지원하거나 babel로 변환하는 최신 브라우저가 필요합니다 .
  */
  
		// printWidth: 120,
		bracketSpacing: true,
  /*
  true-예 : { foo: bar }
  false-예 : {foo: bar}
  */
  
  
		arrowParens: 'avoid', //가능하면 생략 , always 항상 써야한다.
		proseWrap : 'preserve', 
		jsxBracketSameLine : true ,
  /*    jsxBracketSameLine true
		<button
		  className="prettier-class"
		  id="prettier-id"
		  onClick={this.handleClick}>
		  Click Here
		</button>
  
	   jsxBracketSameLine  false
		<button
		  className="prettier-class"
		  id="prettier-id"
		  onClick={this.handleClick}
		>
		  Click Here
		</button>
  */
		vueIndentScriptAndStyle :true, // script 영역의 들여쓰기  true false
		// insertPragma: true
	  }]
	},
	parserOptions: {
	  parser: "babel-eslint"
	},
	overrides: [
	  {
		files: [
		  "**/__tests__/*.{j,t}s?(x)",
		  "**/tests/unit/**/*.spec.{j,t}s?(x)"
		],
		env: {
		  jest: true
		}
	  }
	]
  };
  