class Paginator:
    def __init__(self, page_size, items):
        self.page_size = page_size
        self.items = items

    def get_page(self, page_number):
        start = (page_number - 1) * self.page_size
        end = start + self.page_size
        return self.items[start:end]
    
    def get_num_pages(self):
        return len(self.items) // self.page_size + 1
    
    def find(self, item):
        return self.items.index(item) // self.page_size + 1