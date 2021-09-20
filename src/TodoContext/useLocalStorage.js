import React from 'react';

const useLocalStorage = (itemName, initialValue) => {
    const [item, setItem] = React.useState(initialValue);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true); 
  
    React.useEffect(() => {
      setTimeout(() => {
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
  
          if(!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
          setItem(parsedItem);
          setLoading(false);
        } catch(error) {
          setError(error);
        }
      }, 1000)
    }, []);
  
    const saveItem = (newItem) => {
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
      } catch(error) {
        setError(error);
      }
    }
    //Cuando un Custom Hook devuelve mas de 2 valores, es recomendable retornar un objeto en lugar de un array
    return {
      item,
      saveItem,
      loading,
      error
    };
}

export {useLocalStorage};