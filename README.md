# react-usetrackedstate

<a href="https://www.npmjs.com/package/react-usetrackedstate"><img src="https://img.shields.io/static/v1?logo=npm&message=react-useTrackedState"></a>


## How to use it 

### Installation

```shell
$ npm i react-usetrackedstate
```
```shell
$ yarn add react-usetrackedstate
```

```javascript
import useTrackedState from 'react-usetrackedstate'
function MyComponent(){
  const counter = useTrackedState({ value: 0 })

  useEffect(() => {
    setInterval(() => {
      counter.value++;
    }, 1000);
  }, [])

  return (
      <p>{counter.value}</p>
  ) 
}
```

```javascript
import useTrackedState from 'react-usetrackedstate'
function MyComponent(){
  const user = useTrackedState({})

  useEffect(() => {

    const responseFromApi = {
      name: "npm",
      email: "npm@npm.com"
    };

    user.set(responseFromApi);
    user.package = "Github";

  }, [])

  return (
      <>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.package}</p>
      </>
  ) 
}
```
<a href="https://codesandbox.io/s/react-usetrackedstate-bujiu">Codesandbox Example</a>
