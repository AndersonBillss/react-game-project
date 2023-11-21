
'use client'
import React, { useState, useEffect, useReducer } from 'react';
import styles from './page.module.css';
const key = process.env.NEXT_PUBLIC_REACT_APP_API_KEY


const initialState = {
  selectedOptionIndex: 0,
  optionsArray: [],
  loadedContent: [],
}

const imageGalleryReducer = (state, action) => {
  switch(action.type){
      case 'INITIALSET':
        return{
          ...state,
        optionsArray: action.payload[0],
        loadedContent: action.payload[1]
        }
      
      case 'SWITCHTABS':
        return{
          ...state,
          selectedOptionIndex: action.key,
          loadedContent: state.optionsArray[action.key].content
        }
    default:
      return state
  }
}

export default function BackgroundImageGallery() {
  const [state, dispatch] = useReducer(imageGalleryReducer, initialState)


  const searchTermList = ['Plants', 'Iceland', 'Coast', 'Cars'];
  useEffect(() => {
    const fetchImageData = async () => {
      const imageSet = [];
      for (let i = 0; i < searchTermList.length; i++) {
        const search = searchTermList[i];
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${search}&client_id=${key}&per_page=30`
          );
          const data = await response.json();
          const content = data.results.map((result) => result.urls.regular);
          imageSet.push({ title: search, content });
        } catch (error) {
          console.error(`Error fetching images for ${search}:`, error);
        }
      }
      dispatch({
        type: 'INITIALSET', 
        payload: [imageSet, imageSet[0].content]})
    };

    fetchImageData();
  }, []);

  function switchBetweenTabsHandler(key) {
    setSelectedOptionIndex(key);
    setLoadedContent(optionsArray[key].content);
  }

  function NavOption(index) {
    const isSelected = state.selectedOptionIndex === index;
    return (
      <option
        key={index}
        className={isSelected ? styles.selectedOption : styles.option}
        onClick={() => dispatch({ type: 'SWITCHTABS', key: index})}
      >
        {state.optionsArray[index].title}
      </option>
    );
  }

  return (
    <main className={styles.ImageGalleryMain}>
      <div className={styles.nav}>
        {state.optionsArray.map((option, index) => NavOption(index))}
      </div>
      {state.loadedContent && (
        <ul className={styles.mainContent}>
          {state.loadedContent.map((item, index) => (
            <li className={styles.mainContentItem} key={index}>
              <img
              className={styles.image}
              src={item}
              alt={state.optionsArray[state.selectedOptionIndex].title}
              key={(state.selectedOptionIndex * 30) + index}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}