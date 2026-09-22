# Learning checkpoints

1. **Input → typed questions.** `state` and three question definitions form the request. Choice selects among criteria; Score evaluates an ordered rubric; Noul returns the probability of a statement. Questions are evaluated independently; our code combines results.
2. **Model output → application policy.** The confidence threshold is local code. It does not alter the already-returned model judgment. Confidence describes the distribution, not an empirically established probability of correctness. Missing confidence leads to human review.
3. **Score is not a category index.** Scores may be fractional because they are weighted over rubric levels. Compare the raw probabilities and legend when present; avoid rounding away uncertainty.
4. **Transparency needs snapshots.** An output belongs to its original request. Editing the form leaves the old result explicitly labeled until a new call succeeds.
5. **Runtime keys have a boundary.** Static browser hosting avoids an application backend receiving credentials. The key must still reach OpenRouter and exists in browser memory. No storage, logging, analytics, or exports are needed for the demo.
6. **Testing transport is not testing model quality.** Adapter tests use synthetic responses. The 12-ticket evaluation is a learning exercise; ambiguous cases need a routing policy, and live accuracy has not been measured.
