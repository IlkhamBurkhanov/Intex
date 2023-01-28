import React, { useState, useEffect } from 'react'
import MFilter from '../MFilter/MFilter'

export function AtributeRu({ Atribute_ru, setAtribute_ru, className }) {
  const removeTags = (indexToRemov) => {
    setAtribute_ru(Atribute_ru.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div>
      <label>Цвет</label>
      <div className=" w-[340px] border rounded-lg border-gray-200 p-1 flex items-center flex-wrap">
        <ul className="flex flex-wrap gap-2  ">
          {Atribute_ru
            ? Atribute_ru.map((tag_ru, index) => (
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
        />
      </div>
    </div>
  )
}

export function AtributeEng({ Atribute_en, setAtribute_en }) {
  const addAtribute_en = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setAtribute_en([...Atribute_en, e.target.value])
      e.target.value = ''
    }
  }

  const removeTags = (indexToRemov) => {
    setAtribute_en(Atribute_en.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div className="w-full border rounded-lg border-gray-400 p-1 flex items-center flex-wrap ">
      <ul className="flex flex-wrap gap-2  ">
        {Atribute_en
          ? Atribute_en.map((tag_en, index) => (
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
        onKeyUp={addAtribute_en}
      />
    </div>
  )
}

export function AtributeUz({ Atribute_uz, setAtribute_uz }) {
  const addAtribute_en = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setAtribute_uz([...Atribute_uz, e.target.value])
      e.target.value = ''
    }
  }

  const removeTags = (indexToRemov) => {
    setAtribute_uz(Atribute_uz.filter((_, index) => index !== indexToRemov))
  }
  return (
    <div className="w-full border rounded-lg border-gray-400 p-1 flex items-center flex-wrap ">
      <ul className="flex flex-wrap gap-2  ">
        {Atribute_uz
          ? Atribute_uz.map((tag_uz, index) => (
              <li key={index}>
                <MFilter>
                  {tag_uz}
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
        onKeyUp={addAtribute_en}
      />
    </div>
  )
}
