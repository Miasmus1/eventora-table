import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import TablePagination from './TablePagination';
import { EventsContext } from '../../contexts/EventsContext';
import { MAX_API_PAGE_LIMIT, MAX_API_ELEMENT_LIMIT } from '../../constants';

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <BrowserRouter>
      <EventsContext.Provider {...providerProps}>{ui}</EventsContext.Provider>
    </BrowserRouter>,
    renderOptions
  );
};

describe('TablePagination', () => {
  const providerProps = {
    value: {
      totalPages: MAX_API_PAGE_LIMIT,
      totalElements: MAX_API_ELEMENT_LIMIT,
    },
  };

  beforeEach(() => {
    renderWithProviders(
      <table>
        <TablePagination />
      </table>,
      { providerProps }
    );
  });

  it('should render pagination component', () => {
    expect(screen.getByText(/Showing \d+ to \d+ of \d+ items/)).toBeInTheDocument();
  });

  it('should disable the "Back" button on the first page', () => {
    const backButton = screen.getAllByRole('button').find((button) => button.textContent === 'Back');
    expect(backButton).toBeDisabled();
  });

  it('should enable the "Next" button on the first page', () => {
    const nextButton = screen.getAllByRole('button').find((button) => button.textContent === 'Next');
    expect(nextButton).toBeEnabled();
  });

  it('should disable the "Next" button on the last page', () => {
    const nextButton = screen.getAllByRole('button').find((button) => button.textContent === 'Next');
    for (let i = 1; i < MAX_API_PAGE_LIMIT; i++) {
      fireEvent.click(nextButton);
    }
    expect(nextButton).toBeDisabled();
  });

  it('should highlight the current page button', () => {
    const currentPageButton = screen.getAllByText('1');
    expect(currentPageButton[0]).toHaveClass(/active/);
  });
});
