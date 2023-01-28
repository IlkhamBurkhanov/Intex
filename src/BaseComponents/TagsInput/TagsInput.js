import React, { useState, useEffect } from 'react'
import MFilter from '../MFilter/MFilter'

export  function TagsInputRu({ tags_ru, setTags_ru }) {
  const addTags_ru = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags_ru([...tags_ru, e.target.value])
      e.target.value = ''
    }
  }

  const removeTags = (indexToRemov) => {
    setTags_ru(tags_ru.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div className="w-full border rounded-lg border-gray-400 p-1 flex items-center flex-wrap ">
      <ul className="flex flex-wrap gap-2  ">
        {tags_ru
          ? tags_ru.map((tag_ru, index) => (
              <li key={index}>
                <MFilter>
                  {tag_ru}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => removeTags(index)}
                  >
                    X
                  </span>
                </MFilter>
              </li>
            ))
          : null}
      </ul>
      <input
        type="text"
        placeholder="Введите значение атрибута"
        className="h-full border-none outline-none w-auto bg-transparent  m-2"
        onKeyUp={addTags_ru}
      />
    </div>
  )
}

export  function TagsInputEng({ tags_en, setTags_en }) {
  const addTags_en = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags_en([...tags_en, e.target.value])
      e.target.value = ''
    }
  }

  const removeTags = (indexToRemov) => {
    setTags_en(tags_en.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div className="w-full border rounded-lg border-gray-400 p-1 flex items-center flex-wrap ">
      <ul className="flex flex-wrap gap-2  ">
        {tags_en
          ? tags_en.map((tag_en, index) => (
              <li key={index}>
                <MFilter>
                  {tag_en}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => removeTags(index)}
                  >
                    X
                  </span>
                </MFilter>
              </li>
            ))
          : null}
      </ul>
      <input
        type="text"
        placeholder="Введите значение атрибута"
        className="h-full border-none outline-none w-auto bg-transparent  m-2"
        onKeyUp={addTags_en}
      />
    </div>
  )
}

export  function TagsInputUz({ tags_uz, setTags_uz }) {
  const addTags_en = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags_uz([...tags_uz, e.target.value])
      e.target.value = ''
    }
  }

  const removeTags = (indexToRemov) => {
    setTags_uz(tags_uz.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div className="w-full border rounded-lg border-gray-400 p-1 flex items-center flex-wrap ">
      <ul className="flex flex-wrap gap-2  ">
        {tags_uz
          ? tags_uz.map((tag_en, index) => (
              <li key={index}>
                <MFilter>
                  {tag_en}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => removeTags(index)}
                  >
                    X
                  </span>
                </MFilter>
              </li>
            ))
          : null}
      </ul>
      <input
        type="text"
        placeholder="Введите значение атрибута"
        className="h-full border-none outline-none w-auto bg-transparent  m-2"
        onKeyUp={addTags_en}
      />
    </div>
  )
}
