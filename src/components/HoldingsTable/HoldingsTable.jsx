import { useState, useMemo } from 'react';
import { formatNumber, formatCurrency, getGainInfo } from '../../utils/formatters';
import './HoldingsTable.css';

const INITIAL_VISIBLE = 4;

export default function HoldingsTable({ holdings, selectedIndices, onToggle, onToggleAll }) {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const hasSelections = selectedIndices.size > 0;

  const allSelected = useMemo(
    () => holdings.length > 0 && selectedIndices.size === holdings.length,
    [holdings.length, selectedIndices.size]
  );

  const someSelected = useMemo(
    () => selectedIndices.size > 0 && selectedIndices.size < holdings.length,
    [holdings.length, selectedIndices.size]
  );

  const sortedHoldings = useMemo(() => {
    const indexed = holdings.map((h, i) => ({ ...h, _originalIndex: i }));
    if (!sortConfig.key || !hasSelections) return indexed;

    return [...indexed].sort((a, b) => {
      let aVal, bVal;
      if (sortConfig.key === 'stcg') {
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
      } else if (sortConfig.key === 'ltcg') {
        aVal = a.ltcg.gain;
        bVal = b.ltcg.gain;
      }
      if (sortConfig.direction === 'asc') return aVal - bVal;
      return bVal - aVal;
    });
  }, [holdings, sortConfig, hasSelections]);

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, INITIAL_VISIBLE);

  const handleSort = (key) => {
    if (!hasSelections) return;
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
        return { key, direction: 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key) => {
    if (!hasSelections) return '↕';
    if (sortConfig.key !== key) return '↕';
    if (sortConfig.direction === 'asc') return '↑';
    return '↓';
  };

  return (
    <div className="holdings">
      <h3 className="holdings__title">Holdings</h3>
      <div className="holdings__table-wrapper">
        <table className="holdings__table">
          <thead>
            <tr>
              <th className="holdings__th holdings__th--check">
                <label className="holdings__checkbox-label">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={() => onToggleAll()}
                  />
                  <span className="holdings__checkbox-custom"></span>
                </label>
              </th>
              <th className="holdings__th">Asset</th>
              <th className="holdings__th holdings__th--right">
                <div>Holdings</div>
                <div className="holdings__th-sub">Current Market Rate</div>
              </th>
              <th className="holdings__th holdings__th--right">Total Current Value</th>
              <th
                className={`holdings__th holdings__th--right holdings__th--sortable ${!hasSelections ? 'holdings__th--disabled' : ''}`}
                onClick={() => handleSort('stcg')}
              >
                <span>Short-term</span>
                <span className={`holdings__sort-icon ${hasSelections && sortConfig.key === 'stcg' ? 'active' : ''}`}>
                  {getSortIcon('stcg')}
                </span>
              </th>
              <th
                className={`holdings__th holdings__th--right holdings__th--sortable ${!hasSelections ? 'holdings__th--disabled' : ''}`}
                onClick={() => handleSort('ltcg')}
              >
                <span>Long-term</span>
                <span className={`holdings__sort-icon ${hasSelections && sortConfig.key === 'ltcg' ? 'active' : ''}`}>
                  {getSortIcon('ltcg')}
                </span>
              </th>
              <th className="holdings__th holdings__th--right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((h) => {
              const idx = h._originalIndex;
              const isSelected = selectedIndices.has(idx);
              const stcgInfo = getGainInfo(h.stcg.gain);
              const ltcgInfo = getGainInfo(h.ltcg.gain);
              const totalValue = h.currentPrice * h.totalHolding;

              return (
                <tr
                  key={`${h.coin}-${h.coinName}-${idx}`}
                  className={`holdings__row ${isSelected ? 'holdings__row--selected' : ''}`}
                  onClick={() => onToggle(idx)}
                >
                  <td className="holdings__td holdings__td--check">
                    <label className="holdings__checkbox-label" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(idx)}
                      />
                      <span className="holdings__checkbox-custom"></span>
                    </label>
                  </td>
                  <td className="holdings__td holdings__td--asset">
                    <img
                      src={h.logo}
                      alt={h.coin}
                      className="holdings__coin-logo"
                      onError={(e) => {
                        e.target.src = 'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
                      }}
                    />
                    <div className="holdings__coin-info">
                      <span className="holdings__coin-name">{h.coinName}</span>
                      <span className="holdings__coin-symbol">{h.coin}</span>
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <div className="holdings__holding-value" title={`Exact: ${h.totalHolding} ${h.coin}`}>
                      {formatNumber(h.totalHolding)} {h.coin}
                    </div>
                    <div className="holdings__holding-sub" title={`Exact: ${h.currentPrice}`}>
                      {formatCurrency(h.currentPrice)}/{h.coin}
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right" title={`Exact: ${totalValue}`}>
                    {formatCurrency(totalValue)}
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <span className={stcgInfo.className} title={`Exact: ${h.stcg.gain}`}>{stcgInfo.text}</span>
                    <div className="holdings__balance-sub" title={`Exact: ${h.stcg.balance} ${h.coin}`}>
                      {formatNumber(h.stcg.balance)} {h.coin}
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <span className={ltcgInfo.className} title={`Exact: ${h.ltcg.gain}`}>{ltcgInfo.text}</span>
                    <div className="holdings__balance-sub" title={`Exact: ${h.ltcg.balance} ${h.coin}`}>
                      {formatNumber(h.ltcg.balance)} {h.coin}
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right holdings__td--sell">
                    {isSelected ? (
                      <span className="holdings__sell-value" title={`Exact: ${h.totalHolding} ${h.coin}`}>
                        {formatNumber(h.totalHolding)} {h.coin}
                      </span>
                    ) : (
                      <span className="holdings__sell-dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {holdings.length > INITIAL_VISIBLE && (
        <button
          className="holdings__view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : 'View all'}
        </button>
      )}
    </div>
  );
}
