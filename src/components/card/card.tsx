import React from 'react';
import type { CardProps } from '../../types/types';
import { LABELS } from '../../utils/constants';

export class Card extends React.Component<CardProps> {
  render() {
    const { name, uid, avian, canine, feline, earthAnimal, earthInsect } =
      this.props;
    return (
      <>
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl shadow-md p-6 w-full max-w-md mx-auto hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-bold text-black mb-2">{name}</h3>
          <p className="text-sm text-gray-800 mb-4">
            <strong className="text-black">{LABELS.uid} </strong>
            {uid}
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              {LABELS.avian}:{' '}
              <span className="font-semibold">{String(avian)}</span>
            </li>
            <li>
              {LABELS.canine}:{' '}
              <span className="font-semibold">{String(canine)}</span>
            </li>
            <li>
              {LABELS.feline}:{' '}
              <span className="font-semibold">{String(feline)}</span>
            </li>
            <li>
              {LABELS.earthAnimal}:{' '}
              <span className="font-semibold">{String(earthAnimal)}</span>
            </li>
            <li>
              {LABELS.earthInsect}:{' '}
              <span className="font-semibold">{String(earthInsect)}</span>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
