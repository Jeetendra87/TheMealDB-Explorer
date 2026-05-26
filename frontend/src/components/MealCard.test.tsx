import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MealCard } from './MealCard';

const meal = {
  id: '52772',
  name: 'Teriyaki Chicken Casserole',
  thumbnail: 'https://example.com/meal.jpg',
  category: 'Chicken',
  area: 'Japanese'
};

describe('MealCard', () => {
  it('renders meal name and metadata', () => {
    render(
      <MemoryRouter>
        <MealCard meal={meal} />
      </MemoryRouter>
    );

    expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
  });
});
