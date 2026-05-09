# TODO

## Order workflow enforcement
- [ ] Update backend admin order status update endpoint to allow only confirmation (pending -> preparing) and block delivery/completed updates.
- [ ] Update backend delivery order update endpoint to allow only delivered (assigned delivery -> delivered) and to update `orders.status` and `delivery.deliverystatus` consistently.
- [ ] Ensure delivery-guy can only update orders assigned to them.
- [ ] Fix frontend admin dashboard so it only shows “Confirm/Start Preparing” (no “Mark Delivered”).
- [ ] Fix frontend delivery portal so it calls the correct status value for delivery completion.
- [ ] Ensure frontend customer order status display matches new states.
- [ ] Run backend/frontend tests or basic API smoke checks.

