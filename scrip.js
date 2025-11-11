// Lấy các phần tử DOM
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const friendCards = document.querySelectorAll('.friend-card');

let currentFilter = 'all';

// Hiệu ứng xuất hiện khi cuộn xuống
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.8;

  friendCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) {
      card.classList.add('show');
    }
  });
});

// Hàm lọc bạn bè
function filterFriends() {
  const searchTerm = searchInput.value.toLowerCase();

  friendCards.forEach(card => {
    const name = card.querySelector('h2').textContent.toLowerCase();
    const category = card.dataset.category;
    const desc = card.querySelector('.desc').textContent.toLowerCase();
    
    // Kiểm tra điều kiện tìm kiếm và lọc
    const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
    const matchesCategory = currentFilter === 'all' || category === currentFilter;
    
    if (matchesSearch && matchesCategory) {
      card.classList.remove('hidden');
      // Trigger reflow to restart animation
      setTimeout(() => {
        card.classList.add('show');
      }, 10);
    } else {
      card.classList.add('hidden');
    }
  });

  // Hiển thị thông báo nếu không có kết quả
  const visibleCards = Array.from(friendCards).filter(card => !card.classList.contains('hidden'));
  if (visibleCards.length === 0) {
    showNoResults();
  } else {
    removeNoResults();
  }
}

// Hiển thị thông báo không có kết quả
function showNoResults() {
  let noResultsMsg = document.querySelector('.no-results');
  if (!noResultsMsg) {
    noResultsMsg = document.createElement('div');
    noResultsMsg.className = 'no-results';
    noResultsMsg.innerHTML = '😢 Không tìm thấy bạn nào phù hợp!';
    document.querySelector('.friends-container').appendChild(noResultsMsg);
  }
}

// Xóa thông báo không có kết quả
function removeNoResults() {
  const noResultsMsg = document.querySelector('.no-results');
  if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Sự kiện tìm kiếm
searchInput.addEventListener('input', () => {
  filterFriends();
});

// Sự kiện lọc theo danh mục
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Xóa class active từ nút cũ
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Thêm class active vào nút mới
    button.classList.add('active');
    // Cập nhật filter hiện tại
    currentFilter = button.dataset.filter;
    // Lọc bạn bè
    filterFriends();
  });
});

// Thêm hiệu ứng hover cho card
friendCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = '';
    }, 10);
  });
});

// Khởi tạo - hiển thị tất cả card
window.addEventListener('load', () => {
  friendCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, index * 100);
  });
});
