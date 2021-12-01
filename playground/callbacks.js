setTimeout(() => {
    console.log('two seconds are up');
}, 2000);

function add(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 2500);
}

add(1, 4, (sum) => {
    console.log(sum);
});
