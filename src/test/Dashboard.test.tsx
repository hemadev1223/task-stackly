import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Stackly Workforce Analytics Dashboard', () => {
  it('renders Stackly branding and lead user Hemadev', () => {
    render(<App />);

    // Brand and platform title
    expect(screen.getByText('Stackly')).toBeInTheDocument();
    expect(screen.getByText(/Workforce Analytics Platform/i)).toBeInTheDocument();

    // Lead user Hemadev R
    const userOccurrences = screen.getAllByText(/Hemadev/i);
    expect(userOccurrences.length).toBeGreaterThan(0);
    expect(screen.getByText(/Hemadev R/i)).toBeInTheDocument();
  });

  it('renders all 5 required KPI metric cards', () => {
    render(<App />);

    expect(screen.getByText(/Total Workforce/i)).toBeInTheDocument();
    expect(screen.getByText(/Present Today/i)).toBeInTheDocument();
    expect(screen.getByText(/On Leave/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote \/ WFH/i)).toBeInTheDocument();
    expect(screen.getByText(/Avg Daily Hours/i)).toBeInTheDocument();
  });

  it('renders the filter bar controls for date, department, location, and status', () => {
    render(<App />);

    expect(screen.getByText(/Workforce Telemetry Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Attendance Status/i)).toBeInTheDocument();
  });

  it('simulates error state and displays retry action', () => {
    render(<App />);

    const errorButton = screen.getByRole('button', { name: /Simulate Error/i });
    fireEvent.click(errorButton);

    expect(screen.getByText(/Failed to load workforce analytics data/i)).toBeInTheDocument();
    expect(screen.getByText(/Stackly workforce telemetry service/i)).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /Retry/i });
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);

    // Error banner should be cleared after retry
    expect(screen.queryByText(/Failed to load workforce analytics data/i)).not.toBeInTheDocument();
  });

  it('simulates empty state and displays reset filters action', () => {
    render(<App />);

    const emptyButton = screen.getByRole('button', { name: /Simulate Empty/i });
    fireEvent.click(emptyButton);

    expect(screen.getByText(/No workforce records match your filters/i)).toBeInTheDocument();
    const resetButton = screen.getByRole('button', { name: /Reset All Filters/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.queryByText(/No workforce records match your filters/i)).not.toBeInTheDocument();
  });
});
