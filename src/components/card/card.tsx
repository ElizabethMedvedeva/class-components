import React from 'react';
import type { CardProps } from '../../types/types';

export class Card extends React.Component<CardProps> {
  render() {
    const { name, uid } = this.props;
    return (
      <>
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl shadow-md p-6 w-full max-w-md mx-auto hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-bold text-black mb-2">{name}</h3>
          <p className="text-sm text-gray-800 mb-4">
            <strong className="text-black">UID:</strong> {uid}
          </p>
        </div>
      </>
    );
  }
}
