def sum_permission_bit(arr: list) -> int:
    sum = 0
    for i in arr:
        sum |= i
    return sum


arr = [
    1,
    4,
    16,
    64,
    512,
    1024,
    2048,
    4096,
    8192,
    16384,
    262144,
    524288,
    1048576,
    2097152,
    4194304,
    8388608,
    67108864,
]

result = sum_permission_bit(arr)

print(result)
print(f"{bin(result)[::-1]}")
print(f"{bin(524288)[::-1]}")
