import { formatCurrency } from '../../utils/formatters';
import './CapitalGainsCard.css';

export default function CapitalGainsCard({
  variant = 'pre',
  stcg,
  ltcg,
  savings,
}) {
  const isPre = variant === 'pre';
  const title = isPre ? 'Pre Harvesting' : 'After Harvesting';

  const netSTCG = stcg.profits - stcg.losses;
  const netLTCG = ltcg.profits - ltcg.losses;
  const realisedGains = netSTCG + netLTCG;

  return (
    <div className={`cg-card ${isPre ? 'cg-card--pre' : 'cg-card--after'}`}>
      <h3 className="cg-card__title">{title}</h3>

      <div className="cg-card__table">
        <div className="cg-card__row cg-card__row--header">
          <span></span>
          <span>Short-term</span>
          <span>Long-term</span>
        </div>
        <div className="cg-card__row">
          <span>Profits</span>
          <span>{formatCurrency(stcg.profits)}</span>
          <span>{formatCurrency(ltcg.profits)}</span>
        </div>
        <div className="cg-card__row">
          <span>Losses</span>
          <span>{formatCurrency(-stcg.losses)}</span>
          <span>{formatCurrency(-ltcg.losses)}</span>
        </div>
        <div className="cg-card__row cg-card__row--net">
          <span>Net Capital Gains</span>
          <span>{formatCurrency(netSTCG)}</span>
          <span>{formatCurrency(netLTCG)}</span>
        </div>
      </div>

      <div className="cg-card__total">
        <span className="cg-card__total-label">
          {isPre ? 'Realised Capital Gains:' : 'Effective Capital Gains:'}
        </span>
        <span className="cg-card__total-value">{formatCurrency(realisedGains)}</span>
      </div>

      {!isPre && savings > 0 && (
        <div className="cg-card__savings">
          <span className="cg-card__savings-emoji">🎉</span>
          <span>You are going to save upto <strong>{formatCurrency(savings)}</strong></span>
        </div>
      )}
    </div>
  );
}
