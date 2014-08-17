/**
    ### maybe(type, [name])

    Same as `union([Nil, type])`.

    ```javascript
    // the value of a radio input where null = no selection
    var Radio = maybe(Str);

    Radio.is('a');     // => true
    Radio.is(null);    // => true
    Radio.is(1);       // => false
    ```    
**/

function maybe(T, name) {

  assert(isType(T), 'bad type');

  // makes the combinator idempotent
  if (T.meta.kind === 'maybe') {
    return T;
  }

  name = name || format('maybe(%s)', getName(T));

  function Maybe(value, mut) {
    forbidNewOperator(this, Maybe);
    // a maybe type is idempotent iif T is idempotent
    return Nil.is(value) ? null : T(value, mut);
  }

  Maybe.meta = {
    kind: 'maybe',
    type: T,
    name: name
  };

  Maybe.is = function (x) {
    return Nil.is(x) || T.is(x);
  };

  return Maybe;
}
